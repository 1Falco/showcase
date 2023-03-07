import { Brand } from '../types/brand.type';
import { GUID } from '../types/guid.type';
import { UUID } from '../types/uuid.type';

export interface IUser {
  readonly id: GUID;
  name: string;
  surname: string;
  active: boolean;
  readonly registeredAt: Date;
  connectedWith: UUID[];
}

type Name = Brand<string, '_username'>;
type Surname = Brand<string, '_surname'>;
