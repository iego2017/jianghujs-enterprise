'use strict';

module.exports = app => {
  return {
    schedule: {
      immediate: true,
      interval: '60s', // 1 分钟间隔; 2m 30s
      type: 'worker', // 只有一个worker执行
      disable: app.config.dataSyncStatus !== '启用',
    },
    async task(ctx) {
      const startTime = new Date().getTime();
      const { logger } = app;

      await ctx.service.tableSync.syncTable({ useSyncTimeSlotFilter: true });

      const endTime = new Date().getTime();
      logger.info('[syncAppData.js]', { useTime: `${endTime - startTime}/ms` });
    },
  };
};
