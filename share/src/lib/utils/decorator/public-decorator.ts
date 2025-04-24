import { SetMetadata } from '@nestjs/common';
import { jwtConstants } from 'share/src/lib/utils/constant';

export const Public = () => SetMetadata(jwtConstants.IS_PUBLIC_KEY, true);
