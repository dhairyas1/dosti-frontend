import { Col, Row, Tabs, notification } from 'antd';
import { LineProgress } from '@ant-design/charts';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useGetPathDetailQuery, useUpdateProgressMutation } from '../client.service';
import PathSections from './components/PathSections';
import PlayerScreen from './components/PlayerScreen/PlayerScreen';
import './PathPlayer.scss';

const PathPlayer = () => {
  const { pathId } = useParams();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [currVideoUrl, setCurrVideoUrl] = useState('');
  const [currProgress, setCurrProgress] = useState(0);

  const { data: pathData, isLoading } = useGetPathDetailQuery(
    { _pathId: pathId },
    { skip: !pathId }
  );

  const [updateProgress] = useUpdateProgressMutation();

  useEffect(() => {
    if (pathData?.path) {
      const firstSection = pathData.path.sections[0];
      if (firstSection && firstSection.lessons[0]) {
        setCurrVideoUrl(firstSection.lessons[0].videoUrl);
      }
      if (pathData.path.progress) {
        setCurrProgress(pathData.path.progress);
      }
    }
  }, [pathData]);

  const handleVideoComplete = async () => {
    try {
      if (pathId && userId) {
        await updateProgress({
          _pathId: pathId,
          _userId: userId,
          progress: currProgress + 1
        }).unwrap();

        setCurrProgress(prev => prev + 1);
        notification.success({
          message: 'Progress updated',
          description: 'You have completed this video'
        });
      }
    } catch (error) {
      notification.error({
        message: 'Failed to update progress',
        description: 'There was an error updating your progress'
      });
    }
  };

  const handleVideoChange = (url: string) => {
    setCurrVideoUrl(url);
  };

  const tabItems = [
    {
      key: 'pathsections',
      label: 'Course Content',
      children: (
        <PathSections
          sectionData={pathData?.path}
          onVideoChange={handleVideoChange}
        />
      )
    }
  ];

  if (isLoading || !pathData?.path) {
    return <div>Loading path...</div>;
  }

  return (
    <div className='path-player'>
      <div className='path-player__wrap container'>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={16}>
            <div className='path-player__main'>
              <PlayerScreen
                videoUrl={currVideoUrl}
                onComplete={handleVideoComplete}
              />
              <div className='path-player__info'>
                <h2 className='path-player__title'>{pathData.path.title}</h2>
                <p className='path-player__description'>{pathData.path.description}</p>
                {currProgress > 0 && (
                  <div className='path-player__progress'>
                    <LineProgress
                      percent={currProgress}
                      size={5}
                      color="#1890ff"
                      style={{ width: '100%' }}
                    />
                  </div>
                )}
              </div>
            </div>
          </Col>

          <Col xs={24} md={8}>
            <div className='path-player__sidebar'>
              <Tabs
                defaultActiveKey="pathsections"
                items={tabItems}
                className="path-player__tabs"
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PathPlayer;
