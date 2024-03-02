import { Strategy } from 'passport-local';
import UserService from '../../../services/user.service';
import { User } from '../../../types/User.type';
import bcrypt from 'bcrypt';
import boom from '@hapi/boom'

const options = {usernameField: 'email', passwordField: 'password'};
const service = new UserService();

const LocalStrategy = new Strategy(options, async(email, password, next) => {
    try {
        const user: User = (await service.findByLogin(email)) as unknown as User
        if(user) {
            const isMatch = await bcrypt.compare(password, user.password);
            const userObject = (user as any).toJSON();
            delete userObject.password
            if (isMatch) {
                next(null, userObject)
            }
            else {
                next(boom.unauthorized, false);
            }
        }
        else {
            next(boom.unauthorized(), false);
        }
    } catch(error) {
        next(error, false);
    }
});

export default LocalStrategy