import { Task } from "src/tasks/entities/task.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class TaskCategory {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    length: 24,
    unique: true
  })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({
    default: null,
    nullable: true
  })
  updatedAt: Date | null = null;


  @DeleteDateColumn()
  deletedAt: Date | null = null;

  @OneToMany(() => Task, (task) => task.categoryId)
  Tasks?: Task[];
}
