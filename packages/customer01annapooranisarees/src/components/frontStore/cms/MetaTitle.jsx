import React from 'react';
import Title from '@components/common/Title';
import { get } from '@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/get';
import { useAppState } from '@components/common/context/app';

export default function MetaTitle() {
  const title = get(useAppState(), 'metaTitle');

  return <Title title={title} />;
}
