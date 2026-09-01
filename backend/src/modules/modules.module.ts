import {Module} from '@nestjs/common';
import {UsersModule} from './v1/users/users.module';

@Module({
  imports: [UsersModule]
})
export class ModulesModule {}