import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class Users{
    @ApiProperty({example:1 ,description:"Unique ID"})
    @PrimaryGeneratedColumn('increment')
    id:number

    @ApiProperty({example:"John" ,description:"User firstname"})
    @Column({type:'text',default:null})
    firstname:string

    @ApiProperty({example:"Doe" ,description:"User lastname"})
    @Column({type:'text',default:null})
    lastname:string

    @ApiProperty({example:"+998901234567" ,description:"User Phonenumber"})
    @Column({type:'text'})
    phone:string

    @ApiProperty({example:"Uzbekistan" ,description:"User address"})
    @Column({type:'text',default:null})
    address:string

    @ApiProperty({example:true ,description:"User Active"})
    @Column({default:false})
    is_block:boolean

    @ApiProperty({example:"sldnjfhlweoifwhoifh" ,description:"User Hashed Token"})
    @Column({type:'text',default:null})
    hashed_refresh_token:string

    @CreateDateColumn()
    createt_at:Date
}