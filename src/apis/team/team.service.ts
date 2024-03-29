import { Injectable } from '@nestjs/common';
import { TeamRepository } from './team.repository';
import { TeamResDto } from './dto/teamRes.dto';
import { MsgResDto } from 'src/common/dto/msgRes.dto';
import { TeamReqDto } from './dto/teamReq.dto';

@Injectable()
export class TeamService {
  constructor(private readonly teamRepository: TeamRepository) {}

  async getTeamDetail(teamId: number): Promise<TeamResDto> {
    return this.teamRepository
      .findOneWithOptionOrFail({ id: teamId })
      .then((data) => TeamResDto.makeRes(data));
  }

  //중복검사 로직 필요하다.
  async addTeam(req: TeamReqDto) {
    await this.teamRepository.insert(req);
    return MsgResDto.ret();
  }

  async modifyTeamDetail(req: TeamReqDto, teamId: number) {
    await this.teamRepository.findOneWithOptionOrFail({ id: teamId });

    await this.teamRepository.update({ id: teamId }, { ...req });

    return MsgResDto.ret();
  }

  async removeTeam(teamId: number): Promise<MsgResDto> {
    await this.teamRepository.findOneWithOptionOrFail({ id: teamId });

    await this.teamRepository.softRemove({
      id: teamId,
    });

    return MsgResDto.ret();
  }
}
