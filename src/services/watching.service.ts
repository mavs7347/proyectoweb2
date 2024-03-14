import { ObjectId } from 'mongoose';
import Watches from '../models/watching.model'
import { Watching, WatchingModel } from '../types/Watching.type';
import boom from '@hapi/boom';

class WatchingService {
    async create(watching: Watching, userId: ObjectId) {
        const newWatching = await Watches.create({...watching, user: userId}).catch((error) => {
            console.log('Could not save watches', error);
        })
        return newWatching;
    }
    
    async findAll() {
        const watches = await Watches.find().catch((error) => {
            console.log('Error while connecting to the DB', error);
        })
        
        if (!watches) {
            throw boom.notFound('There are not watches');
        }
        
        return watches;
    }

    async findById(id: string) {
        const watching = await Watches.findById(id).catch((error) => {
            console.log('Error while connecting to the BD', error);
        })
        
        if (!watching) {
            throw boom.notFound('Watching not found');
        }

        return watching;
    }

    //No me funcionó la búsqueda por nombre
    async findByName(name: string) {
        const watching = await Watches.findOne({ name }).catch((error) => {
          console.log('Error while connecting to the DB', error)
        })
    
        if (!watching) {
          throw boom.notFound('Watching not found')
        }
      }
}

export default WatchingService;