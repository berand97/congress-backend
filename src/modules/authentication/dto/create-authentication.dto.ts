import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthenticationDto {
  @ApiProperty({
    description: '',
    type: String,
    required: true,
  })
  email: string;

  @ApiProperty({
    description: '',
    type: String,
    required: true,
  })
  password: string;
}
