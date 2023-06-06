import { HttpError } from './error/HttpError.js'
import {PostUserRequest} from "./request/user/PostUserRequest.js"
import {PutUserRequest} from "./request/user/PutUserRequest.js"
import * as argon2 from 'argon2'

export class UserController {
    constructor (db) {
        this.db = db
    }

    async all (req, res) {
        const users = await this.db.user.findMany()
        if (!users.length) {
            throw new HttpError(404, 'no users found')
        }

        res.status(200).send(users.map(({password, ...result}) => result))
    }

    async get (req, res) {
        const id = req.params.id
        const user = await this.db.user.findUnique({
            where: { id: parseInt(id) }
        })

        if (!user) {
            throw new HttpError(404, 'user not found')
        }

        const { password, ...result } = user
        res.status(200).send(result)
    }

    async post (req, res) {
        const user = new PostUserRequest(req).data()
        user.password = await argon2.hash(user.password)

        try {
            const {password, ...result} = await this.db.user.create({ data: user })
            res.status(201).send(result)
        } catch (err) {
            if (err.code === 'P2002') {
                throw new HttpError(400, 'user already exists')
            }
            throw new HttpError(500, 'could not create user')
        }
    }

    async put (req, res) {
        const id = req.params.id
        const user = new PutUserRequest(req).data()

        try {
            user.password = await argon2.hash(user.password)
            const {password, ...result} = await this.db.user.update({
                where: { id: parseInt(id) },
                data: user
            })

            res.status(200).send(result)
        } catch (err) {
            if (err.code === 'P2025') {
                throw new HttpError(404, 'user not found')
            }
            throw new HttpError(500, 'could not edit user')
        }
    }

    async delete (req, res) {
        const id = req.params.id
        try {
            await this.db.user.delete({
                where: { id: parseInt(id) }
            })

            res.status(200).send({ message: 'user removed' })
        } catch (err) {
            if (err.code === 'P2025') {
                throw new HttpError(404, 'user not found')
            }
            throw new HttpError(500, 'could not delete user')
        }
    }
}
