import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('otp')
export class Otp{

    @ApiProperty({example:1 ,description:"Unique ID"})
    @PrimaryGeneratedColumn('increment')
    id:number

    @ApiProperty({example:1 ,description:"Unique ID"})
    @Column({type:'text'})
    otp_id:number

    @ApiProperty({example:"" ,description:"Otp"})
    @Column({type:'text'})
    otp:string

    @ApiProperty({example:"Date" ,description:"Date "})
    @Column({type:'date'})
    expiration_time:Date

    @ApiProperty({example:"+998901234567" ,description:"Phone Number"})
    @Column({type:'text'})
    check:string

    @ApiProperty({example:true ,description:"Verified Active"})
    @Column({default:false})
    verified:boolean
}