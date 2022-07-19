import React, { useState, useEffect } from 'react';
import api from '../../../api';
import RichTextEditor from '../../../components/RichTextEditor';
import Button from '../../../components/Button';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const Privacy = () => {
  const { t } = useTranslation();
  const [data, setData] = useState('');
  const [docId, setDocId] = useState('');

  useEffect(() => {
    getPrivacy();
  }, []);

  const getPrivacy = async () => {
    const result = await api('get', `/StaticPages/privacy`);
    setData(result.data.data.privacy);
    setDocId(result.data.data._id);
  };

  const handleUpdate = async () => {
    const result = await api('put', `/StaticPages/${docId}`, { privacy: data });
    setData(result.data.data.privacy);
    setDocId(result.data.data._id);
    toast.success(t(result.data.message));
  };

  return (
    <div className="w-full  md:mx-auto py-9 ">
      <div className="container mx-auto px-6">
        <div className="flex justify-between pb-3">
          <h1 className="text-2xl font-bold">CGU</h1>
        </div>

        <RichTextEditor setValue={setData} value={data} />
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
          <Button variant="outlined" label="Update" onClick={handleUpdate} translate={t} />
        </div>
      </div>
    </div>
  );
};

export default Privacy;
