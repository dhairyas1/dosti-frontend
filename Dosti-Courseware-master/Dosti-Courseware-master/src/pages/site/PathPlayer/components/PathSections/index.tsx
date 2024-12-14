import React from 'react';
import { Collapse, CollapseProps, Skeleton } from '../../../../../../components/antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BACKEND_URL } from '../../../../../constant/backend-domain';
import { RootState } from '../../../../../store/store';
import { ICertificate } from '../../../../../types/certificate';
import { useGetSectionsByCourseIdQuery, IPath } from '../../../client.service';
import './PathSections.scss';
import PathPlayerLessonList from './components/LessonList';

interface PathSectionsProps {
  sectionData: IPath;
  onVideoChange: (url: string) => void;
}

const PathSections: React.FC<PathSectionsProps> = ({ sectionData, onVideoChange }) => {
  const { isFetching } = useGetSectionsByCourseIdQuery(sectionData.courseId || '');
  const certificatePath = useSelector((state: RootState) => state.client.certificatePath);
  const currentProgress = useSelector((state: RootState) => state.client.currentProgress);

  const sectionItems: CollapseProps['items'] = sectionData?.sections.map((sectionItem, index) => {
    const { _id, name } = sectionItem;
    const sectionTemplateItem = {
      key: _id,
      label: (
        <h3 className='section__title'>
          {index + 1} - {name}
        </h3>
      ),
      children: <PathPlayerLessonList sectionId={_id} />
    };
    return sectionTemplateItem;
  });

  const finalSectionItem = {
    key: 'final',
    label: (
      <div className='section__title'>
        <h3>Certification</h3>
      </div>
    ),
    children:
      certificatePath && currentProgress === 1 ? (
        <Link target='_blank' to={`${BACKEND_URL}/images/${certificatePath}`}>
          Got the certification here!!!
        </Link>
      ) : (
        <div>Complete the videos first to get the certificate</div>
      )
  };

  if (sectionItems) {
    sectionItems.push(finalSectionItem);
  }

  return (
    <div className={`path-sections ${sectionData.className || ''}`}>
      <div className='path-sections__wrap'>
        <div className='path-sections-item'>
          <div className='section'>
            <div className='section__content'>
              {isFetching && <Skeleton />}
              {!isFetching && (
                <div className='section__content-item'>
                  <Collapse style={{ borderRadius: '0px' }} items={sectionItems} defaultActiveKey={['1']} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathSections;
