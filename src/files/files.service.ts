import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import * as uuid from "uuid"
import * as fs from "fs"
import * as path from "path"

@Injectable()
export class FilesService { 
    async createFile(fileName: any): Promise<string> {
        try {
            const file = uuid.v4()+`.jpg`
            const filePath = path.resolve(__dirname,"..", "static")
            if(!fs.existsSync(filePath)) fs.mkdirSync(filePath,{recursive:true})

            fs.writeFileSync(path.join(filePath,file),fileName.buffer)
            return file

        } catch (error) {
            throw new HttpException("Error creating file", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}