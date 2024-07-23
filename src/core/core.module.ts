import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [CommonModule, UsersModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class CoreModule {}
