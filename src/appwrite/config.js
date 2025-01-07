import conf from "../conf/conf";
import { Client, ID,Databases,Storage,Query } from "appwrite";
 

export class Service{
    Client =new Client()
    databases;
    bucket;
    constructor(){
        this.Client
        .setEndpoint(conf.appwriteurl)
        .setProject(conf.appwriteprojectid)  
        this.databases= new Databases(this.Client)
        this.bucket=new Storage(this.Client)
    }
    async createpost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDATABASEid,
                conf.appwritecollectionid,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            throw error
        }
    }
    async updatepost(slug,{title,content,featuredImage,status}){
           try {
            return await this.databases.updateDocument(
                conf.appwriteDATABASEid,
                conf.appwritecollectionid,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    
                }
            )
           } catch (error) {
            throw error
           }
    }
    async deletepost(slug){
      try {
        await this.databases.deleteDocument(
            conf.appwriteDATABASEid,
            conf.appwritecollectionid,
            slug
        )
        return true
      } catch (error) {
        throw error
        return false
      }
      
    }
    async getpost(slug){
        try {
             return await this.databases.getDocument(
                conf.appwriteDATABASEid,
                conf.appwritecollectionid,
                slug
             )
        } catch (error) {
            throw error
            return false
        }
    }
    async getposts(quaries=[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDATABASEid,
                conf.appwritecollectionid,
                quaries,
            )
        } catch (error) {
            throw error
            return false
        }
    }
    async uploadfile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBUCKETid,
                ID.unique(),
                file
            )
        } catch (error) {
            return false
        }
    }
    async deletefile(fileId){
        try {
        await this.bucket.deleteFile(
            conf.appwriteBUCKETid,
            fileId
        )
        return true
    }
        catch (error) {
            throw error
            return false
        }
    }
    getfilepreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBUCKETid,
            fileId
        )
    }
}


const service=new Service()
export default service