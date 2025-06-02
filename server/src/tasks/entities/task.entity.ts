import { TaskRecord } from "#types/task.types";
import { TaskCategory } from "src/task-categories/entities/task-category.entity";
import { TaskStatus } from "src/task-statuses/entities/task-status.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Task implements TaskRecord {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    length: 512
  })
  name: string;

  @Column({
    type: 'int',
    nullable: true
  })
  categoryId: number | null = null;

  @Column({
    type: 'int',
    default: 1
  })
  statusId: number;

  @Column({
    type: 'int',
    nullable: true
  })
  priority: number | null = null;


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({
    default: null,
    nullable: true
  })
  updatedAt: Date | null = null;


  @DeleteDateColumn()
  deletedAt: Date | null = null;

  @ManyToOne(() => TaskStatus, (status) => status.Tasks)
  @JoinColumn({
    referencedColumnName: 'id',
    name: 'statusId'
  })
  Status?: TaskStatus | null;

  @ManyToOne(() => TaskCategory, (category) => category.Tasks)
  @JoinColumn({
    referencedColumnName: 'id',
    name: 'categoryId'
  })
  Category?: TaskCategory | null;
}
