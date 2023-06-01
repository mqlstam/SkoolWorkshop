import { describe, it } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import { WorkshopController } from '../../src/controller/WorkshopController.js'

describe('controller/WorkshopController', () => {
    const workshops = [
        { id: 1, name: 'Workshop 1', groupSize: 10 },
        { id: 2, name: 'Workshop 2', groupSize: 25 }
    ]

    describe('all', () => {
        it('should return a list of workshops', async () => {
            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { workshop: { findMany: sinon.stub().returns(workshops) } }
            const controller = new WorkshopController(db)

            await controller.all({}, res)
            expect(db.workshop.findMany.calledOnce).to.be.true
            expect(res.status.calledOnceWith(200)).to.be.true
            expect(res.send.calledOnceWith(workshops)).to.be.true
        })

        it('should return 404 if no workshops are found', async () => {
            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { workshop: { findMany: sinon.stub().returns([]) } }
            const controller = new WorkshopController(db)

            try {
                await controller.all({}, res)
                expect.fail('should have thrown an error')
            } catch (err) {
                expect(err.message).to.equal('no workshops found')
                expect(db.workshop.findMany.calledOnce).to.be.true
            }
        })
    })

    describe('get', () => {
        it('should return a specific workshop', async () => {
            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { workshop: { findUnique: sinon.stub().returns(workshops[0]) } }
            const controller = new WorkshopController(db)

            await controller.get({params: 1}, res)
            expect(db.workshop.findUnique.calledOnce).to.be.true
            expect(res.status.calledOnceWith(200)).to.be.true
            expect(res.send.calledOnceWith(workshops[0])).to.be.true
        })

        it('should return 404 if no workshop is found', async () => {
            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { workshop: { findUnique: sinon.stub().returns(null) } }
            const controller = new WorkshopController(db)

            try {
                await controller.get({params: 1}, res)
                expect.fail('should have thrown an error')
            } catch (err) {
                expect(err.message).to.equal('workshop not found')
                expect(db.workshop.findUnique.calledOnce).to.be.true
            }
        })
    })

    describe('put', () => {
        it('should update a workshop', async () => {
            const workshop = { ...workshops[0], name: 'Workshop 1 updated' }
            const req = { params: { id: 1 }, body: workshop }
            delete req.body.id

            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { workshop: { update: sinon.stub().returns(workshop) } }
            const controller = new WorkshopController(db)

            await controller.put(req, res)
            expect(db.workshop.update.calledOnce).to.be.true
            expect(res.status.calledOnceWith(200)).to.be.true
            expect(res.send.calledOnceWith(workshop)).to.be.true
        })

        it('should return 404 when a workshop does not exist', async () => {
            const error = new Error()
            error.code = 'P2025'

            const workshop = { ...workshops[0], name: 'Workshop 1 updated' }
            const req = { params: { id: 1 }, body: workshop }
            delete req.body.id

            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { workshop: { update: sinon.stub().throws(error) } }
            const controller = new WorkshopController(db)

            try {
                await controller.put(req, res)
                expect.fail('should have thrown an error')
            } catch (err) {
                expect(db.workshop.update.calledOnce).to.be.true
                expect(err.message).to.equal('workshop not found')
                expect(err.status).to.equal(404)
            }
        })
    })

    describe('delete', () => {
        it('should delete a workshop', async () => {
            const req = { params: { id: 1 } }
            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { workshop: { delete: sinon.stub() } }
            const controller = new WorkshopController(db)

            await controller.delete(req, res)
            expect(db.workshop.delete.calledOnce).to.be.true
            expect(res.status.calledOnceWith(200)).to.be.true
            expect(res.send.calledOnceWith({ message: 'workshop removed' })).to.be.true
        })

        it('should return 404 when a workshop does not exist', async () => {
            const error = new Error()
            error.code = 'P2025'

            const req = { params: { id: 1 } }
            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { workshop: { delete: sinon.stub().throws(error) } }
            const controller = new WorkshopController(db)

            try {
                await controller.delete(req, res)
                expect.fail('should have thrown an error')
            } catch (err) {
                expect(db.workshop.delete.calledOnce).to.be.true
                expect(err.message).to.equal('workshop not found')
                expect(err.status).to.equal(404)
            }
        })
    })

    describe('post', () => {
        it('should post a workshop', async () => {
            const req = {
                headers: {
                    'content-type': 'multipart/form-data'
                },
                body: {
                    name: 'Workshop 3',
                    groupSize: 15
                },
                file: {
                    path: '../../uploads/test.jpg',
                    originalname: 'test.jpg'
                    // Add other necessary properties for the file
                }
            }
            const workshopToCreate = { name: req.body.name, groupSize: parseInt(req.body.groupSize), imagePath: req.file.path }
            const createdWorkshop = { id: 3, ...workshopToCreate }
            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = {
                workshop: {
                    findUnique: sinon.stub().returns(null),
                    create: sinon.stub().returns(createdWorkshop)
                }
            }
            const controller = new WorkshopController(db)

            await controller.post(req, res)
            expect(db.workshop.findUnique.calledOnce).to.be.true
            expect(db.workshop.create.calledOnceWith({ data: workshopToCreate })).to.be.true
            expect(res.status.calledOnceWith(201)).to.be.true
            expect(res.send.calledOnceWith(createdWorkshop)).to.be.true
        })

        it('should return 400 if workshop name is already taken', async () => {
            const req = {
                headers: {
                    'content-type': 'multipart/form-data'
                },
                body: {
                    name: 'Workshop 3',
                    groupSize: 15
                },
                file: {
                    path: '../../uploads/test.jpg',
                    originalname: 'test.jpg'
                    // Add other necessary properties for the file
                }
            }
            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = {
                workshop: {
                    findUnique: sinon.stub().returns(workshops[0]),
                    create: sinon.stub()
                }
            }
            const controller = new WorkshopController(db)

            await controller.post(req, res)
            expect(db.workshop.findUnique.calledOnce).to.be.true
            expect(db.workshop.create.called).to.be.false
            expect(res.status.calledOnce).to.be.true
            expect(res.status.firstCall.args[0]).to.equal(400)
            expect(res.send.calledOnce).to.be.true
            expect(res.send.firstCall.args[0]).to.deep.equal({
                message: `Workshop with name ${req.body.name} already exists.`
            })
        })

        it('should return 400 if workshop name or groupSize is missing', async () => {
            const req = {
                headers: {
                    'content-type': 'multipart/form-data' // Add the appropriate content-type header
                },
                body: {},
                file: {}
            }
            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = {
                workshop: {
                    findUnique: sinon.stub(),
                    create: sinon.stub()
                }
            }
            const controller = new WorkshopController(db)

            await controller.post(req, res)
            expect(db.workshop.findUnique.called).to.be.false
            expect(db.workshop.create.called).to.be.false
            expect(res.status.calledOnce).to.be.true
            expect(res.status.firstCall.args[0]).to.equal(400)
            expect(res.send.calledOnce).to.be.true
            expect(res.send.firstCall.args[0]).to.deep.equal({
                message: 'Workshop name and group size are required.'
            })
        })
    })
})
