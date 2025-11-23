import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  // const { data, error } = await supabase
  //   .from('regions')
  //   .select('*');

  // if (error || !data) {
  // console.warn('Supabase error or no data, returning mock data:', error);
  // Mock data based on typical subsidies (approximate values)
  const mockData = [
    { key: 'seoul', name: '서울', rwd: 1500000, longRange: 1500000, performance: 1500000 },
    { key: 'gyeonggi', name: '경기', rwd: 3000000, longRange: 3000000, performance: 3000000 },
    { key: 'incheon', name: '인천', rwd: 3000000, longRange: 3000000, performance: 3000000 },
    { key: 'busan', name: '부산', rwd: 2500000, longRange: 2500000, performance: 2500000 },
    { key: 'daegu', name: '대구', rwd: 2500000, longRange: 2500000, performance: 2500000 },
    { key: 'gwangju', name: '광주', rwd: 3000000, longRange: 3000000, performance: 3000000 },
    { key: 'daejeon', name: '대전', rwd: 3000000, longRange: 3000000, performance: 3000000 },
    { key: 'ulsan', name: '울산', rwd: 3000000, longRange: 3000000, performance: 3000000 },
    { key: 'sejong', name: '세종', rwd: 3000000, longRange: 3000000, performance: 3000000 },
    { key: 'gangwon', name: '강원', rwd: 3500000, longRange: 3500000, performance: 3500000 },
    { key: 'chungbuk', name: '충북', rwd: 4000000, longRange: 4000000, performance: 4000000 },
    { key: 'chungnam', name: '충남', rwd: 4000000, longRange: 4000000, performance: 4000000 },
    { key: 'jeonbuk', name: '전북', rwd: 4000000, longRange: 4000000, performance: 4000000 },
    { key: 'jeonnam', name: '전남', rwd: 4000000, longRange: 4000000, performance: 4000000 },
    { key: 'gyeongbuk', name: '경북', rwd: 4000000, longRange: 4000000, performance: 4000000 },
    { key: 'gyeongnam', name: '경남', rwd: 4000000, longRange: 4000000, performance: 4000000 },
    { key: 'jeju', name: '제주', rwd: 3500000, longRange: 3500000, performance: 3500000 },
  ];
  return NextResponse.json(mockData);
  // }

  // return NextResponse.json(data);
}
