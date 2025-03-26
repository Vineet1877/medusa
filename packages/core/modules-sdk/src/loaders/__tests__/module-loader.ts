import { ModuleResolution } from "@medusajs/types"
import { createMedusaContainer } from "@medusajs/utils"
import { moduleLoader } from "../module-loader"

describe("moduleLoader", () => {
  let container: any
  let logger: any

  beforeEach(() => {
    container = createMedusaContainer()
    logger = {
      error: jest.fn(),
    }
  })

  it("should load modules successfully", async () => {
    const moduleResolutions: Record<string, ModuleResolution> = {
      testModule: {
        resolutionPath: "test-module",
        definition: {
          key: "testModule",
          label: "Test Module",
          isRequired: false,
          defaultPackage: "test-module",
          dependencies: [],
          defaultModuleDeclaration: {
            scope: "internal",
          },
        },
        moduleDeclaration: {
          scope: "internal",
        },
        dependencies: [],
        options: {},
      },
    }

    await moduleLoader({
      container,
      moduleResolutions,
      logger,
    })

    expect(logger.error).not.toHaveBeenCalled()
  })

  it("should handle module loading errors", async () => {
    const moduleResolutions: Record<string, ModuleResolution> = {
      testModule: {
        resolutionPath: false,
        definition: {
          key: "testModule",
          label: "Test Module",
          isRequired: true,
          defaultPackage: "test-module",
          dependencies: [],
          defaultModuleDeclaration: {
            scope: "internal",
          },
        },
        moduleDeclaration: {
          scope: "internal",
        },
        dependencies: [],
        options: {},
      },
    }

    await expect(
      moduleLoader({
        container,
        moduleResolutions,
        logger,
      })
    ).rejects.toThrow()
  })

  it("should handle module loading with dependencies", async () => {
    const moduleResolutions: Record<string, ModuleResolution> = {
      testModule: {
        resolutionPath: "test-module",
        definition: {
          key: "testModule",
          label: "Test Module",
          isRequired: false,
          defaultPackage: "test-module",
          dependencies: ["dependency1", "dependency2"],
          defaultModuleDeclaration: {
            scope: "internal",
          },
        },
        moduleDeclaration: {
          scope: "internal",
        },
        dependencies: ["dependency1", "dependency2"],
        options: {},
      },
    }

    await moduleLoader({
      container,
      moduleResolutions,
      logger,
    })

    expect(logger.error).not.toHaveBeenCalled()
  })

  it("should handle module loading with options", async () => {
    const moduleResolutions: Record<string, ModuleResolution> = {
      testModule: {
        resolutionPath: "test-module",
        definition: {
          key: "testModule",
          label: "Test Module",
          isRequired: false,
          defaultPackage: "test-module",
          dependencies: [],
          defaultModuleDeclaration: {
            scope: "internal",
          },
        },
        moduleDeclaration: {
          scope: "internal",
        },
        dependencies: [],
        options: {
          customOption: "value",
        },
      },
    }

    await moduleLoader({
      container,
      moduleResolutions,
      logger,
    })

    expect(logger.error).not.toHaveBeenCalled()
  })
})
