import { DownOutlined } from '@ant-design/icons';
import { Collapse, CollapseProps } from 'antd';
import { formatTime } from '../../../../../utils/functions';
import { useGetSectionsByCourseIdQuery } from '../../../client.service';
import CourseDetailLessonList from '../LessonList';
import { ISection } from '../../../../../types/course.type';
import './SectionList.scss';

type SectionListProps = {
  courseId: string;
};

const SectionList = ({ courseId }: SectionListProps) => {
  const { data: sectionData } = useGetSectionsByCourseIdQuery(courseId);

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const sectionItems: CollapseProps['items'] = sectionData?.sections.map((sectionItem: ISection, index: number) => {
    const { _id, name, lessons, totalVideosLength } = sectionItem;

    return {
      key: `${index}`,
      label: (
        <div className='section__title'>
          <h3>{name}</h3>
          <div className='section__summary'>
            {lessons.length} lectures • {formatTime(totalVideosLength || 0)}
          </div>
        </div>
      ),
      children: <CourseDetailLessonList sectionId={_id} />
    };
  }) || [];

  return (
    <div className='course-detail__content-collapse'>
      <Collapse
        items={sectionItems}
        defaultActiveKey={sectionData?.sections.map((_, index) => `${index}`)}
        onChange={onChange}
      />
    </div>
  );
};

export default SectionList;
