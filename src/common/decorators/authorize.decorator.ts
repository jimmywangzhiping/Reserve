import { SetMetadata } from '@nestjs/common';
import { AUTHORIZE_KEY_METADATA } from '../contants/admin.contants';

export const Authorize = () => SetMetadata(AUTHORIZE_KEY_METADATA, true);
