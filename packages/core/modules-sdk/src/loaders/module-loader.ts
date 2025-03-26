import { Logger, MedusaContainer, ModuleResolution } from "@medusajs/types"
import { asValue } from "awilix"
import { EOL } from "os"
import { loadInternalModule } from "./utils"

export const moduleLoader = async ({
  container,
  moduleResolutions,
  logger,
  migrationOnly,
  loaderOnly,
}: {
  container: MedusaContainer
  moduleResolutions: Record<string, ModuleResolution>
  logger: Logger
  migrationOnly?: boolean
  loaderOnly?: boolean
}): Promise<void> => {
  for (const resolution of Object.values(moduleResolutions ?? {})) {
    const registrationResult = await loadModule(
      container,
      resolution,
      logger!,
      migrationOnly,
      loaderOnly
    )

    if (registrationResult?.error) {
      const { error } = registrationResult
      logger?.error(
        `Could not resolve module: ${resolution.definition.label}. Error: ${error.message}${EOL}`
      )
      throw error
    }
  }
}

async function loadModule(
  container: MedusaContainer,
  resolution: ModuleResolution,
  logger: Logger,
  migrationOnly?: boolean,
  loaderOnly?: boolean
): Promise<{ error?: Error } | void> {
  const modDefinition = resolution.definition

  if (!modDefinition.key) {
    throw new Error(`Module definition is missing property "key"`)
  }

  const keyName = modDefinition.key

  if (resolution.resolutionPath === false) {
    container.register(keyName, asValue(undefined))
    return
  }

  return await loadInternalModule({
    container,
    resolution,
    logger,
    migrationOnly,
    loaderOnly,
  })
}
