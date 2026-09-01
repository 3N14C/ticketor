import {Injectable} from '@nestjs/common';
import type {PrismaService} from "../../../infrastructure/prisma/prisma.service.ts";

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {
	}

	async getAll() {
		const users = await this.prisma.db.orm.public.User.all()

		return users
	}
}