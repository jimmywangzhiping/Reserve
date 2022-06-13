// import { HttpException } from '@nestjs/common';
import { ErrorCodeMap } from '../contants/error-code.contants';

export class ApiException {
  errorMsg(errorCode: number) {
    return { errorCode: errorCode, message: ErrorCodeMap[errorCode] };
  }
}
