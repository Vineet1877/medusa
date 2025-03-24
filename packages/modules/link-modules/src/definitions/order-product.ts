import { ModuleJoinerConfig } from "@medusajs/framework/types"
import { Modules } from "@medusajs/framework/utils"

export const OrderProductLink: ModuleJoinerConfig = {
  isLink: true,
  extends: [
    {
      serviceName: Modules.ORDER,
      entity: "Order",
      relationship: {
        serviceName: Modules.PRODUCT,
        primaryKey: "id",
        foreignKey: "product_id",
        alias: "product",
        args: {
          methodSuffix: "Products",
        },
      },
    },
  ],
}

