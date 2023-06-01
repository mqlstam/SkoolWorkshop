import { describe, it } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import { WorkshopController } from '../../src/controller/WorkshopController.js'

describe('WorkshopController', () => {
    const workshops = [
        { id: 1, name: 'Workshop 1', groupSize: 10 },
        { id: 2, name: 'Workshop 2', groupSize: 25 }
    ]

    describe('get', () => {
        it('should return a list of workshops', async () => {
            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { workshop: { findMany: sinon.stub().returns(workshops) } }
            const controller = new WorkshopController(db)

            await controller.get({}, res)
            expect(db.workshop.findMany.calledOnce).to.be.true
            expect(res.status.calledOnceWith(200)).to.be.true
            expect(res.send.calledOnceWith(workshops)).to.be.true
        })

        it('should return 404 if no workshops are found', async () => {
            const res = { status: sinon.stub().returnsThis(), send: sinon.stub() }
            const db = { workshop: { findMany: sinon.stub().returns([]) } }
            const controller = new WorkshopController(db)

            await controller.get({}, res)
            expect(db.workshop.findMany.calledOnce).to.be.true
            expect(res.status.calledOnceWith(404)).to.be.true
            expect(res.send.calledOnceWith({ message: 'No workshops found' })).to.be.true
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
