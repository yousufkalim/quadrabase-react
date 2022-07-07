import React, { useState, useEffect } from 'react';
import api from '../../../api';
import RichTextEditor from '../../../components/RichTextEditor';
import Button from '../../../components/Button';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const Terms = () => {
  const { t } = useTranslation();
  const [data, setData] = useState('');
  const [docId, setDocId] = useState('');

  useEffect(() => {
    getTerms();
  }, []);

  const getTerms = async () => {
    const result = await api('get', `/StaticPages/terms`);
    setData(result.data.data.terms);
    setDocId(result.data.data._id);
  };

  const handleUpdate = async () => {
    const result = await api('put', `/StaticPages/${docId}`, { terms: data });
    setData(result.data.data.terms);
    setDocId(result.data.data._id);
    toast.success(t(result.data.message));
  };

  return (
    <div className="w-full  md:mx-auto py-9 ">
      <div className="container mx-auto px-6">
        <div className="flex justify-between pb-3">
          <h1 className="text-2xl font-bold">CGV</h1>
        </div>

        <RichTextEditor setValue={setData} value={data} />
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
          <Button variant="outlined" label="Update" onClick={handleUpdate} translate={t} />
        </div>
      </div>
    </div>
  );
};

export default Terms;
