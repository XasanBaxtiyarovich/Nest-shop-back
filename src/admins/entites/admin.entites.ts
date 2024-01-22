import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('admin')
export class Admin{

    @ApiProperty({example:1 ,description:"Unique ID"})
    @PrimaryGeneratedColumn('increment')
    id:number

    @ApiProperty({example:"John" ,description:"Admin firstname"})
    @Column({type:'text',default:null})
    firstname:string

    @ApiProperty({example:"Doe" ,description:"Admin lastname"})
    @Column({type:'text',default:null})
    lastname:string

    @ApiProperty({example:"username" ,description:"Admin username"})
    @Column({type:'text'})
    username:string

    @ApiProperty({example:"password" ,description:"Admin password"})
    @Column({type:'text'})
    password:string

    @ApiProperty({example:"password" ,description:"Admin confirm password"})
    @Column({type:'text'})
    confirm_password:string

    @ApiProperty({example:"password" ,description:"Admin Block"})
    @Column({default:false})
    is_block:boolean

    @ApiProperty({example:false ,description:"Admin is superadmin"})
    @Column({default:false})
    is_superadmin:boolean

    @ApiProperty({example:"sldnjfhlweoifwhoifh" ,description:"User Hashed Token"})
    @Column({type:'text',default:null})
    hashed_refresh_token:string

    @ApiProperty({example:"sldnjfhlweoifwhoifh" ,description:"User Hashed Token"})
    @Column({type:'text'})
    hashed_password:string

    @CreateDateColumn()
    createt_at:Date
}