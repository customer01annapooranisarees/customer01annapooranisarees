import React from 'react';
import Meta from '@components/common/Meta';
import { useAppState } from '@components/common/context/app';
import { get } from '@customer01annapooranisarees/customer01annapooranisarees/src/lib/util/get';

export default function MetaDescription() {
  const description = get(useAppState(), 'metaDescription', '');

  return <Meta name="description" content={description} />;
}
