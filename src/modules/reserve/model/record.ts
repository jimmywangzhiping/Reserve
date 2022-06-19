import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';

@ObjectType()
export class Record {
  @Field() _id?: string;
  @Field() tableSize: number;
  @Field((type) => ID) userId: string;
  @Field() reserveAt: Date;
  @Field() status: string;
}

@InputType()
export class RecordInput implements Partial<Record> {
  @Field() _id?: string;
  @Field() tableSize: number;
  @Field((type) => ID, { nullable: true }) userId: string;
  @Field() reserveAt: Date;
  @Field((type) => String, { nullable: true }) status: string;
}
