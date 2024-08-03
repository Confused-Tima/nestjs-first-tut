import { PassportStrategy } from '@nestjs/passport';
import { log } from 'console';
import { Strategy } from 'passport-jwt';

log(PassportStrategy);
log(Strategy);
log(PassportStrategy(Strategy));
