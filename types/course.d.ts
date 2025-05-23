import { BaseEntity } from "./base"


export interface Course extends BaseEntity {
    name: string
    year: string
    semester?: string
}