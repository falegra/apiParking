import { Body, Controller, Param, ParseIntPipe, Put, Res, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Response } from 'express';
import { AdminGuard } from 'src/auth/admin.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Put('/:id')
    @UseGuards(AdminGuard)
    @ApiResponse({status: 239, description: 'updated user info successfully'})
    @ApiResponse({status: 452, description: 'error updating the user info'})
    @ApiResponse({status: 454, description: 'user not found'})
    updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUser: UpdateUserDto,
        @Res() res: Response
    ) {
        return this.userService.updateUser(id, updateUser, res);
    }
}
