import { InternalModuleDeclaration } from "@medusajs/types"
import { MedusaModule } from "../../medusa-module"

import { asValue } from "awilix"

const mockRegisterMedusaModule = jest.fn().mockImplementation(() => {
  return {}
})

const mockModuleLoader = jest.fn().mockImplementation(({ container }) => {
  container.register({
    moduleKey: asValue({}),
  })
  return Promise.resolve({})
})

jest.mock("./../../loaders", () => ({
  registerMedusaModule: () => mockRegisterMedusaModule(),
  moduleLoader: jest
    .fn()
    .mockImplementation((...args) => mockModuleLoader.apply(this, args)),
}))

describe("MedusaModule", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should register a module with default configuration", async () => {
    const moduleDeclaration: InternalModuleDeclaration = {
      scope: "internal",
      resolve: "test-module",
    }

    await MedusaModule.bootstrap({
      moduleKey: "test-module",
      defaultPath: "test-module",
      declaration: moduleDeclaration,
    })

    expect(mockRegisterMedusaModule).toHaveBeenCalledWith(
      "test-module",
      expect.objectContaining({
        scope: "internal",
        resolve: "test-module",
      }),
      undefined,
      undefined
    )
  })

  it("should register a module with custom configuration", async () => {
    const moduleDeclaration: InternalModuleDeclaration = {
      scope: "internal",
      resolve: "test-module",
      options: {
        customOption: "value",
      },
    }

    await MedusaModule.bootstrap({
      moduleKey: "test-module",
      defaultPath: "test-module",
      declaration: moduleDeclaration,
    })

    expect(mockRegisterMedusaModule).toHaveBeenCalledWith(
      "test-module",
      expect.objectContaining({
        scope: "internal",
        resolve: "test-module",
        options: {
          customOption: "value",
        },
      }),
      undefined,
      undefined
    )
  })

  it("should handle module registration with dependencies", async () => {
    const moduleDeclaration: InternalModuleDeclaration = {
      scope: "internal",
      resolve: "test-module",
      dependencies: ["dependency1", "dependency2"],
    }

    await MedusaModule.bootstrap({
      moduleKey: "test-module",
      defaultPath: "test-module",
      declaration: moduleDeclaration,
    })

    expect(mockRegisterMedusaModule).toHaveBeenCalledWith(
      "test-module",
      expect.objectContaining({
        scope: "internal",
        resolve: "test-module",
        dependencies: ["dependency1", "dependency2"],
      }),
      undefined,
      undefined
    )
  })

  it("should handle module registration with shared container", async () => {
    const moduleDeclaration: InternalModuleDeclaration = {
      scope: "internal",
      resolve: "test-module",
    }

    await MedusaModule.bootstrap({
      moduleKey: "test-module",
      defaultPath: "test-module",
      declaration: moduleDeclaration,
    })

    expect(mockRegisterMedusaModule).toHaveBeenCalledWith(
      "test-module",
      expect.objectContaining({
        scope: "internal",
        resolve: "test-module",
      }),
      undefined,
      undefined
    )
  })

  it("should handle module registration with module exports", async () => {
    const moduleDeclaration: InternalModuleDeclaration = {
      scope: "internal",
      resolve: "test-module",
    }

    const moduleExports = {
      default: {
        service: jest.fn(),
      },
    }

    await MedusaModule.bootstrap({
      moduleKey: "test-module",
      defaultPath: "test-module",
      declaration: moduleDeclaration,
    })

    expect(mockRegisterMedusaModule).toHaveBeenCalledWith(
      "test-module",
      expect.objectContaining({
        scope: "internal",
        resolve: "test-module",
      }),
      moduleExports,
      undefined
    )
  })

  it("should handle module registration with definition", async () => {
    const moduleDeclaration: InternalModuleDeclaration = {
      scope: "internal",
      resolve: "test-module",
    }

    const definition = {
      key: "test-module",
      label: "Test Module",
      isRequired: false,
    }

    await MedusaModule.bootstrap({
      moduleKey: "test-module",
      defaultPath: "test-module",
      declaration: moduleDeclaration,
    })

    expect(mockRegisterMedusaModule).toHaveBeenCalledWith(
      "test-module",
      expect.objectContaining({
        scope: "internal",
        resolve: "test-module",
      }),
      undefined,
      definition
    )
  })
})
