import { Truck } from '@/models/TruckTypes';

// Import all mooc products with correct names
import { cimc3TrucSan } from './cimc-3-truc-san';
import { cimcBonBotMi } from './cimc-bon-bot-mi';
import { cimcBonXiMang } from './cimc-bon-xi-mang';
import { cimcLung } from './cimc-lung';
import { cimcRao } from './cimc-rao';
import { cimcXitecChoXangDau } from './cimc-xitec-cho-xang-dau';
import { doosung3TrucBen } from './doosung-3-truc-ben';
import { doosung3TrucSanRut } from './doosung-3-truc-san-rut';
import { doosung3Truc } from './doosung-3-truc';
import { doosungBonBuiSat } from './doosung-bon-bui-sat';
import { doosungChuyenChoContainer } from './doosung-chuyen-cho-container';
import { doosungCoCo } from './doosung-co-co';
import { doosungXitecXangDau } from './doosung-xitec-xang-dau';
import { doosungXuong } from './doosung-xuong';
import { koksanBen3Truc } from './koksan-ben-3-truc';
import { soosanDUMP25B } from './mooc-ben-soosan-2-do-25m3-mau-2025-DUMP-25B';
import { soosanDUMP25LA } from './mooc-ben-soosan-2-do-truc-nang-ha-25m3-DUMP-25LA';
import { soosanDUMP25C } from './mooc-ben-soosan-4-do-25m3-mau-2025-DUMP-25C';
import { soosanFBT48B } from './mooc-san-soosan-48ft-dai-14m8-FBT-48B';

// Collect all products
export const moocProducts: Truck[] = [
  cimc3TrucSan,
  cimcBonBotMi,
  cimcBonXiMang,
  cimcLung,
  cimcRao,
  cimcXitecChoXangDau,
  doosung3TrucBen,
  doosung3TrucSanRut,
  doosung3Truc,
  doosungBonBuiSat,
  doosungChuyenChoContainer,
  doosungCoCo,
  doosungXitecXangDau,
  doosungXuong,
  koksanBen3Truc,
  soosanDUMP25B,
  soosanDUMP25LA,
  soosanDUMP25C,
  soosanFBT48B,
];

// Re-export individual products
export * from './cimc-3-truc-san';
export * from './cimc-bon-bot-mi';
export * from './cimc-bon-xi-mang';
export * from './cimc-lung';
export * from './cimc-rao';
export * from './cimc-xitec-cho-xang-dau';
export * from './doosung-3-truc-ben';
export * from './doosung-3-truc-san-rut';
export * from './doosung-3-truc';
export * from './doosung-bon-bui-sat';
export * from './doosung-chuyen-cho-container';
export * from './doosung-co-co';
export * from './doosung-xitec-xang-dau';
export * from './doosung-xuong';
export * from './koksan-ben-3-truc';
export * from './mooc-ben-soosan-2-do-25m3-mau-2025-DUMP-25B';
export * from './mooc-ben-soosan-2-do-truc-nang-ha-25m3-DUMP-25LA';
export * from './mooc-ben-soosan-4-do-25m3-mau-2025-DUMP-25C';
export * from './mooc-san-soosan-48ft-dai-14m8-FBT-48B';
