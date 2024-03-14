import { ObjectId } from 'mongoose';
import Watches from '../models/watching.model'
import { Watching, WatchingModel } from '../types/Watching.type';
import boom from '@hapi/boom';
import { USER_REFERENCE } from '../models/user.model';
class WatchingService {
    async create(watching: Watching, userId: ObjectId) {
        const newWatching = await Watches.create({...watching, user: userId}).catch((error) => {
            console.log('Could not save watches', error);
        })
        const existingWatching = await this.findById((newWatching as any)._id);
        return existingWatching.populate([{ path: 'user', strictPopulate: false}]);
    }
    
    async findAll() {
        const watches = await Watches.find().populate([{ path: 'user', strictPopulate: false}]).catch((error) => {
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