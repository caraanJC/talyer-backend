import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('user_sessions')
export class Session {
  @PrimaryColumn()
  sid: string; // Session ID

  @Column('jsonb')
  sess: { [key: string]: any };

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  expire: Date; // Expiry time for session
}
