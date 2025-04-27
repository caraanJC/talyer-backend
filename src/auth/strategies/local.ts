import { Strategy as LocalStrategy } from 'passport-local';
import { AppDataSource } from '../../config/AppDataSource';
import { User } from '../../entities/User';
import bcrypt from 'bcrypt';

const localStrategy = new LocalStrategy(
  { usernameField: 'email' },
  async (email: string, password: string, done) => {
    try {
      const userRepository = AppDataSource.getRepository(User);

      const user = await userRepository.findOne({
        where: {
          email: email
        },
        select: [ 'email', 'name', 'id', 'password' ]
      })

      if (!user) {
        throw new Error('User not found')
      }

      const result = await bcrypt.compare(password, user.password);

      if (!result) {
        throw new Error('Incorrect email or password');
      }

      return done(null, {
        user_id: user.id,
        name: `${user.name}`,
        created_at: Date.now()
      });

    } catch (error) {
      return done(error);
    }
  }
);

export default localStrategy;
