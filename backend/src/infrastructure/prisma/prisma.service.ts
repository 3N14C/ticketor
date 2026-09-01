import {Injectable} from "@nestjs/common";
import {db, listUsers, type StarterUser} from "./users.ts";

@Injectable()
export class PrismaService {
  readonly db = db;

  listUsers(limit = 10): Promise<StarterUser[]> {
    return listUsers(limit);
  }
}