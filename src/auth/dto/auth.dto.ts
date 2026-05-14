import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
  @ApiProperty({
    description: 'JWT access token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVlMzFhM2MyLTIzMjEtNDdjMy1hNzE2LWZhZDkxNmMxY2NiYiIsImlhdCI6MTc3ODUzMDU2NSwiZXhwIjoxNzc4NTM3NzY1fQ.hQzgZKQRePhJ40vzlMD2L_cxAw1VHzjdrYafsK-vZW8',
  })
  accessToken!: string;
}
