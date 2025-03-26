import { ContainerRegistrationKeys, Modules, upperCaseFirst } from "@medusajs/utils"
import { InternalModuleDeclaration, ModuleDefinition } from "@medusajs/types"

export const ModulesDefinition: {
  [key: string]: ModuleDefinition
} = {
  [Modules.EVENT_BUS]: {
    key: Modules.EVENT_BUS,
    defaultPackage: false,
    label: upperCaseFirst(Modules.EVENT_BUS),
    isRequired: false,
    isQueryable: false,
    dependencies: [ContainerRegistrationKeys.LOGGER],
    defaultModuleDeclaration: {} as InternalModuleDeclaration,
  },
  [Modules.STOCK_LOCATION]: {
    key: Modules.STOCK_LOCATION,
    defaultPackage: false,
    label: upperCaseFirst(Modules.STOCK_LOCATION),
    isRequired: false,
    isQueryable: true,
    dependencies: [Modules.EVENT_BUS, ContainerRegistrationKeys.LOGGER],
    defaultModuleDeclaration: {} as InternalModuleDeclaration,
  },
  [Modules.PRICING]: {
    key: Modules.PRICING,
    defaultPackage: false,
    label: upperCaseFirst(Modules.PRICING),
    isRequired: false,
    isQueryable: true,
    dependencies: [Modules.EVENT_BUS, ContainerRegistrationKeys.LOGGER],
    defaultModuleDeclaration: {} as InternalModuleDeclaration,
  },
  [Modules.PROMOTION]: {
    key: Modules.PROMOTION,
    defaultPackage: false,
    label: upperCaseFirst(Modules.PROMOTION),
    isRequired: false,
    isQueryable: true,
    dependencies: [ContainerRegistrationKeys.LOGGER],
    defaultModuleDeclaration: {} as InternalModuleDeclaration,
  },
  [Modules.AUTH]: {
    key: Modules.AUTH,
    defaultPackage: false,
    label: upperCaseFirst(Modules.AUTH),
    isRequired: false,
    isQueryable: true,
    dependencies: [ContainerRegistrationKeys.LOGGER, Modules.CACHE],
    defaultModuleDeclaration: {} as InternalModuleDeclaration,
  },
  [Modules.WORKFLOW_ENGINE]: {
    key: Modules.WORKFLOW_ENGINE,
    defaultPackage: false,
    label: upperCaseFirst(Modules.WORKFLOW_ENGINE),
    isRequired: false,
    isQueryable: true,
    dependencies: [ContainerRegistrationKeys.LOGGER],
    __passSharedContainer: true,
    defaultModuleDeclaration: {} as InternalModuleDeclaration,
  },
  [Modules.SALES_CHANNEL]: {
    key: Modules.SALES_CHANNEL,
    defaultPackage: false,
    label: upperCaseFirst(Modules.SALES_CHANNEL),
    isRequired: false,
    isQueryable: true,
    dependencies: [ContainerRegistrationKeys.LOGGER],
    defaultModuleDeclaration: {} as InternalModuleDeclaration,
  },
  [Modules.FULFILLMENT]: {
    key: Modules.FULFILLMENT,
    defaultPackage: false,
    label: upperCaseFirst(Modules.FULFILLMENT),
    isRequired: false,
    isQueryable: true,
    dependencies: [ContainerRegistrationKeys.LOGGER, Modules.EVENT_BUS],
    defaultModuleDeclaration: {} as InternalModuleDeclaration,
  },
  [Modules.CART]: {
    key: Modules.CART,
    defaultPackage: false,
    label: upperCaseFirst(Modules.CART),
    isRequired: false,
    isQueryable: true,
    dependencies: [
      Modules.EVENT_BUS,
      Modules.PRICING,
      Modules.PROMOTION,
      ContainerRegistrationKeys.LOGGER,
      ContainerRegistrationKeys.QUERY,
    ],
    defaultModuleDeclaration: {} as InternalModuleDeclaration,
  },
  [Modules.INDEX]: {
    key: Modules.INDEX,
    defaultPackage: false,
    label: upperCaseFirst(Modules.INDEX),
    isRequired: false,
    isQueryable: false,
    dependencies: [
      Modules.EVENT_BUS,
      Modules.LOCKING,
      ContainerRegistrationKeys.LOGGER,
      ContainerRegistrationKeys.REMOTE_QUERY,
      ContainerRegistrationKeys.QUERY,
    ],
    defaultModuleDeclaration: {} as InternalModuleDeclaration,
  },
  [Modules.LOCKING]: {
    key: Modules.LOCKING,
    defaultPackage: false,
    label: upperCaseFirst(Modules.LOCKING),
    isRequired: false,
    isQueryable: false,
    dependencies: [ContainerRegistrationKeys.LOGGER],
    defaultModuleDeclaration: {} as InternalModuleDeclaration,
  },
}

export const MODULE_DEFINITIONS: ModuleDefinition[] =
  Object.values(ModulesDefinition)

export default MODULE_DEFINITIONS
