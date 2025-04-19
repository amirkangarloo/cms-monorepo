import { SetMetadata } from '@nestjs/common';
import { jwtConstants } from 'apps/api/src/utils/constant';

export const Public = () => SetMetadata(jwtConstants.IS_PUBLIC_KEY, true);
