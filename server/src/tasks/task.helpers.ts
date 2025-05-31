import { Task } from "./entities/task.entity";

const MOCK_DATA = {
  priority: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, null, null, null
  ],
  name: [
    "Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu.",
    "Vitae pellentesque sem placerat in id cursus mi. Tempus leo eu aenean sed diam urna tempor. Nec metus bibendum egestas iaculis massa nisl malesuada. Ut hendrerit semper vel class aptent taciti sociosqu. Conubia nostra inceptos himenaeos orci varius natoque penatibus. Montes nascetur ridiculus mus donec rhoncus eros lobortis.",
    "Ex sapien vitae pellentesque sem placerat in id. Pretium tellus duis convallis tempus leo eu aenean. Urna tempor pulvinar vivamus fringilla lacus nec metus. Iaculis massa nisl malesuada lacinia integer nunc posuere. Semper vel class aptent taciti sociosqu ad litora. Conubia nostra inceptos himenaeos orci varius natoque penatibus.",
    "Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu.",
    "Elit quisque faucibus ex sapien vitae pellentesque sem. Sem placerat in id cursus mi pretium tellus. Tellus duis convallis tempus leo eu aenean sed. Sed diam urna tempor pulvinar vivamus fringilla lacus. Lacus nec metus bibendum egestas iaculis massa nisl. Nisl malesuada lacinia integer nunc posuere ut hendrerit."
  ],
  statusId: [1, 2, 3, 4,] as const,
  categoryId: [null, 1]
} as const;

interface CreateMockTaskConfig {
  counts: Record<number, number>;
}

export class TaskHelpers {
  private static getMockDate(): Date {
    const today = new Date();
    const fiveDaysAgo = new Date(today);

    fiveDaysAgo.setDate(today.getDate() - 5);

    const timeDiff = today.getTime() - fiveDaysAgo.getTime();
    const randomTime = Math.random() * timeDiff;

    return new Date(fiveDaysAgo.getTime() + randomTime);
  }

  private static getMockValue<Key extends keyof typeof MOCK_DATA>(key: Key) {
    const index = ~~(Math.random() * MOCK_DATA[key].length);

    return MOCK_DATA[key][index] as typeof MOCK_DATA[Key][number];
  }

  private static getMockName() {
    return `${this.getMockValue('name')}`;
  }

  private static getMockStatusId(statusId?: number) {
    if (typeof statusId === 'number') {
      return ~~statusId;
    }

    const sId = this.getMockValue('statusId');

    return sId + 0;
  }

  private static getMockCategoryId() {
    const categoryId = this.getMockValue('categoryId');

    if (categoryId === null) {
      return null;
    }

    return categoryId + 0;
  }

  private static getMockPriority() {
    const priority = this.getMockValue('priority');

    if (priority === null) {
      return null;
    }

    return priority + 0;
  }

  private static createMockTask(id: number, statusId?: number): Task {
    return {
      id,
      name: this.getMockName(),
      priority: this.getMockPriority(),
      statusId: this.getMockStatusId(statusId),
      categoryId: this.getMockCategoryId(),
      createdAt: this.getMockDate(),
      updatedAt: Math.random() > 0.75 ? new Date() : null,
      deletedAt: null
    };
  }

  /**
   * The function `createFlatMockTasks` generates mock tasks based on the provided configuration, either
   * a number or an object mapping status IDs to task counts.
   * @param {number | CreateMockTaskConfig} config - The `config` parameter in the `createFlatMockTasks`
   * function can be either a number or an object of type `CreateMockTaskConfig`. If it is a number, the
   * function will create that number of mock tasks with the specified `statusId`. If it is an object,
   * the keys
   * @param {number} [statusId] - The `statusId` parameter in the `createFlatMockTasks` method is an
   * optional parameter of type number. It is used to specify the status ID for the tasks being created.
   * If provided, it will be used when creating mock tasks. If not provided, the tasks will be created
   * without a
   * @returns The `createFlatMockTasks` function returns an array of mock tasks based on the provided
   * configuration. If the `config` parameter is a number, it generates that number of mock tasks with
   * the specified `statusId`. If the `config` parameter is an object mapping status IDs to task counts,
   * it generates mock tasks for each status ID and returns a flat array of all generated tasks.
   */
  private static createFlatMockTasks(config: number | CreateMockTaskConfig, statusId?: number) {
    if (typeof config === 'number') {
      return [...new Array(config)].map((_, index) => this.createMockTask(index + 1, statusId));
    }

    const taskMap = new Map<number, Task[]>();

    for (const statusId in config) {
      const count = config[statusId];
      const intStatusId = +statusId;
      const tasks = this.createFlatMockTasks(count, intStatusId)!;

      taskMap.set(intStatusId, tasks);
    }

    return Array.from(taskMap.values()).flat();
  }

  public static createMockTasks(config: number | CreateMockTaskConfig) {
    return this.createFlatMockTasks(config);
  }
}