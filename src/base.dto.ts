import { Allow } from "class-validator";

export class BaseDTO { 
  @Allow()
  context
}