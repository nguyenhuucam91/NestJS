import { UniqueConstraint } from 'src/rules/unique';
import { Global, Module } from "@nestjs/common";


@Global()
@Module({
  exports: [UniqueConstraint],
  providers: [
    UniqueConstraint,
  ]
})

export class RuleModule {

}