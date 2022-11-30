import React, { useState, useEffect } from "react";

import { Table as NeetoUITable, PageLoader } from "neetoui";

import scheduleApi from "apis/admin/schedules";

import { buildTableColumnData } from "./utils";

const Schedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const {
        data: { schedules: schedules },
      } = await scheduleApi.fetch();
      setSchedules(
        schedules.map(schedule => ({
          ...schedule,
          articleId: schedule.article_id,
          publishAt: schedule.publish_at,
          unpublishAt: schedule.unpublish_at,
        }))
      );
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="mx-auto my-8 w-auto px-64">
      <NeetoUITable
        allowRowClick={false}
        columnData={buildTableColumnData}
        rowData={schedules}
      />
    </div>
  );
};

export default Schedules;
