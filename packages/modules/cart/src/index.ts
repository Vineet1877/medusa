import { Module, Modules } from "@medusajs/framework/utils"
import { CartModuleService } from "./services"

const CartModule = Module(Modules.CART, {
  service: CartModuleService,
});

export default CartModule;
