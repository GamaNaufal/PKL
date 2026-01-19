"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MACHINE_NUMBERS } from "@/lib/press-history-static";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

export default function PressHistoryFormPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [form, setForm] = useState({
    partNumber: "",
    partTypeId: null as number | null,
    productionNumber: "",
    pressDate: new Date().toISOString().slice(0, 10),
    operatorName: user?.name || "",
    machineNumber: "",
    compoundNo: "",
    lotCompoundNo: "",
    compoundExpiry: "",
    tempSettingTop: "",
    tempSettingBottom: "",
    actualTempTop: "",
    actualTempBottom: "",
    tempCoolRunner: "",
    holdingPressure: "",
    productionCycle: "",
    productionQty: "",
    qtyOk: "",
    qtyNg: "",
    ngType: "",
    cumulativeNotCleaned: "",
    // Pengecekan Awal Produksi (Injection)
    cekMoldJig: "",
    pin: "",
    lubangPin: "",
    core: "",
    bearing: "",
    cutFlow: "",
    ejectorPosition: "",
    releaseUsed: "",
    airgunRubberTray: "",
    vacumStartStop: "",
    buangShotStartStop: "",
    // Pengecekan Awal Produksi (Compression)
    cekMoldJigComp: "",
    pinComp: "",
    lubangPinComp: "",
    coreComp: "",
    bearingComp: "",
    cutFlowComp: "",
    ejectorPositionComp: "",
    buangShotStartStopComp: "",
    releaseUsedComp: "",
    airgunRubberTrayComp: "",
    polkaYokeCondition: "",
    vacumStartStopComp: "",
  });
  const [success, setSuccess] = useState(false);
  const [pressType, setPressType] = useState<"injection" | "compression">(
    "injection"
  );
  const [modal, setModal] = useState<{
    open: boolean;
    message: string;
    type: "success" | "error" | "confirm";
    onConfirm?: (() => void) | null;
  }>({ open: false, message: "", type: "success", onConfirm: null });

  // Helper for updating form state
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Autocomplete for part number (dynamic from backend)
  const [partSearch, setPartSearch] = useState("");
  const [showPartDropdown, setShowPartDropdown] = useState(false);
  const [partOptions, setPartOptions] = useState<any[]>([]);
  const [partLoading, setPartLoading] = useState(false);

  // Fetch part types from backend as user types
  useEffect(() => {
    if (!partSearch) return;
    setPartLoading(true);
    api
      .get(`/part-types?q=${encodeURIComponent(partSearch)}`)
      .then((res) => {
        setPartOptions(res.data.data.data || []); // paginated
      })
      .catch(() => setPartOptions([]))
      .finally(() => setPartLoading(false));
  }, [partSearch]);

  // Autocomplete for machine number
  const [machineSearch, setMachineSearch] = useState("");
  const [showMachineDropdown, setShowMachineDropdown] = useState(false);
  const filteredMachines = MACHINE_NUMBERS.filter((m) =>
    m.toLowerCase().includes(machineSearch.toLowerCase())
  ).slice(0, 10);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSuccess(false);
    // Validasi sederhana (bisa dikembangkan sesuai kebutuhan)
    let partTypeId = form.partTypeId;
    if (!partTypeId && form.partNumber) {
      const found = partOptions.find((p) => p.part_number === form.partNumber);
      if (found) partTypeId = found.id;
    }
    if (!partTypeId || !form.productionNumber || !form.machineNumber) {
      setModal({
        open: true,
        message:
          "Pastikan semua input utama (Nomor Part, Nomor Urut Produksi, Nomor Mesin) sudah diisi dengan benar.",
        type: "error",
      });
      return;
    }
    // Tampilkan konfirmasi sebelum submit
    setModal({
      open: true,
      message: "Apakah Anda yakin semua input sudah benar?",
      type: "confirm",
      onConfirm: async () => {
        // Build payload
        const payload = {
          part_type_id: partTypeId,
          production_sequence_number: form.productionNumber,
          press_date: form.pressDate,
          machine_number: form.machineNumber,
          compound_number: form.compoundNo,
          compound_lot: form.lotCompoundNo,
          compound_expiry_date: form.compoundExpiry,
          setting_temp_upper: form.tempSettingTop,
          setting_temp_lower: form.tempSettingBottom,
          actual_temp_upper: form.actualTempTop,
          actual_temp_lower: form.actualTempBottom,
          cool_runner_temp: form.tempCoolRunner,
          holding_pressure: form.holdingPressure,
          cycle_time: form.productionCycle,
          production_quantity: form.productionQty,
          qty_ok: form.qtyOk,
          ng_type: form.ngType,
          cumulative_not_cleaning: form.cumulativeNotCleaned,
          injection_mold_jig_check: form.cekMoldJig,
          injection_ejector_position: form.ejectorPosition,
          injection_release_used: form.releaseUsed,
          injection_air_gun_check: form.airgunRubberTray,
          injection_vacuum_check: form.vacumStartStop,
          injection_first_shot_disposal: form.buangShotStartStop,
          compression_mold_jig_check: form.cekMoldJigComp,
          compression_ejector_position: form.ejectorPositionComp,
          compression_first_shot_disposal: form.buangShotStartStopComp,
          compression_release_used: form.releaseUsedComp,
          compression_air_gun_check: form.airgunRubberTrayComp,
          compression_polka_yoke_condition: form.polkaYokeCondition,
          compression_vacuum_check: form.vacumStartStopComp,
          press_type: pressType,
        };
        try {
          await api.post("/press-history", payload);
          setModal({
            open: true,
            message: "Data berhasil disimpan!",
            type: "success",
          });
          setTimeout(() => {
            setModal({ open: false, message: "", type: "success" });
            router.push("/dashboard");
          }, 1500);
        } catch (err: any) {
          setModal({
            open: true,
            message:
              err?.response?.data?.message ||
              "Gagal menyimpan data. Cek koneksi atau data.",
            type: "error",
          });
        }
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-10 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold text-white drop-shadow">
          Form Laporan Historis Press
        </h1>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white font-semibold transition-all duration-200 border border-white/40"
        >
          <span>←</span> Kembali
        </button>
      </div>
      {/* Modal Alert */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div
            className={`rounded-2xl px-8 py-6 shadow-2xl text-center max-w-xs w-full animate-fade-in-fast ${
              modal.type === "success"
                ? "bg-green-100 border border-green-400 text-green-900"
                : modal.type === "error"
                ? "bg-red-100 border border-red-400 text-red-900"
                : "bg-blue-100 border border-blue-400 text-blue-900"
            }`}
          >
            <div className="text-lg font-bold mb-2">
              {modal.type === "success"
                ? "Berhasil"
                : modal.type === "error"
                ? "Perhatian"
                : "Konfirmasi"}
            </div>
            <div className="mb-4">{modal.message}</div>
            {modal.type === "error" && (
              <button
                className="mt-2 px-6 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold shadow"
                onClick={() => setModal({ ...modal, open: false })}
              >
                Kembali ke Form
              </button>
            )}
            {modal.type === "confirm" && (
              <div className="flex gap-4 justify-center mt-2">
                <button
                  className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow"
                  onClick={() => {
                    setModal({ ...modal, open: false });
                    if (modal.onConfirm) modal.onConfirm();
                  }}
                >
                  Sudah
                </button>
                <button
                  className="px-6 py-2 rounded-lg bg-gray-400 hover:bg-gray-500 text-white font-semibold shadow"
                  onClick={() => setModal({ ...modal, open: false })}
                >
                  Belum
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section: Identitas Produksi */}
        <div className="mb-8 p-6 rounded-2xl border border-[#e9ecef] bg-white/90 shadow-lg">
          <h2 className="text-xl font-bold text-[#344767] mb-6">
            Identitas Produksi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Part Number Autocomplete (dynamic) */}
            <div className="relative">
              <label className="block text-[#344767] font-medium mb-2">
                Nomor Part
              </label>
              <input
                type="text"
                placeholder="Cari nomor part..."
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767] placeholder:text-[#8392ab] focus:ring-2 focus:ring-[#5e72e4]"
                value={partSearch || form.partNumber}
                onChange={(e) => {
                  setPartSearch(e.target.value);
                  setShowPartDropdown(true);
                  setForm((f) => ({ ...f, partNumber: "", partTypeId: null }));
                }}
                onFocus={() => setShowPartDropdown(true)}
                onBlur={() => setTimeout(() => setShowPartDropdown(false), 150)}
                autoComplete="off"
              />
              {showPartDropdown && (partOptions.length > 0 || partLoading) && (
                <ul className="absolute z-20 w-full max-h-48 overflow-y-auto bg-white border border-[#e9ecef] rounded-lg mt-1 shadow-lg">
                  {partLoading && (
                    <li className="px-4 py-2 text-[#8392ab]">Memuat...</li>
                  )}
                  {partOptions.map((p) => (
                    <li
                      key={p.id}
                      className={`px-4 py-2 cursor-pointer hover:bg-[#f6f9fc] ${
                        form.partTypeId === p.id
                          ? "bg-[#f6f9fc] text-[#344767]"
                          : "text-[#344767]"
                      }`}
                      onMouseDown={() => {
                        setForm((f) => ({
                          ...f,
                          partNumber: p.part_number,
                          partTypeId: p.id,
                        }));
                        setPartSearch("");
                        setShowPartDropdown(false);
                      }}
                    >
                      <span className="font-bold">{p.part_number}</span>
                      {p.part_name && (
                        <span className="ml-2 text-[#5e72e4]">
                          {p.part_name}
                        </span>
                      )}
                      {p.category && (
                        <span className="ml-2 text-xs text-[#8392ab]">
                          [{p.category}]
                        </span>
                      )}
                    </li>
                  ))}
                  {!partLoading && partOptions.length === 0 && (
                    <li className="px-4 py-2 text-[#8392ab]">
                      Tidak ditemukan
                    </li>
                  )}
                </ul>
              )}
              {form.partNumber && (
                <div className="mt-1 text-xs text-[#5e72e4]">
                  Dipilih: <span className="font-bold">{form.partNumber}</span>
                </div>
              )}
            </div>
            {/* Production Number */}
            <div>
              <label className="block text-[#344767] font-medium mb-2">
                Nomor Urut Produksi
              </label>
              <input
                type="text"
                name="productionNumber"
                value={form.productionNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767]"
                required
              />
            </div>
            {/* Press Date (auto-filled) */}
            <div>
              <label className="block text-[#344767] font-medium mb-2">
                Tanggal Press
              </label>
              <input
                type="date"
                name="pressDate"
                value={form.pressDate}
                readOnly
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767] opacity-70 cursor-not-allowed"
              />
            </div>
            {/* Operator Name (auto-filled) */}
            <div>
              <label className="block text-[#344767] font-medium mb-2">
                Nama Operator
              </label>
              <input
                type="text"
                name="operatorName"
                value={form.operatorName}
                readOnly
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767] opacity-70 cursor-not-allowed"
              />
            </div>
            {/* Machine Number Autocomplete */}
            <div className="relative">
              <label className="block text-[#344767] font-medium mb-2">
                Nomor Mesin
              </label>
              <input
                type="text"
                placeholder="Cari nomor mesin..."
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767] placeholder:text-[#8392ab] focus:ring-2 focus:ring-[#5e72e4]"
                value={machineSearch || form.machineNumber}
                onChange={(e) => {
                  setMachineSearch(e.target.value);
                  setShowMachineDropdown(true);
                  setForm((f) => ({ ...f, machineNumber: "" }));
                }}
                onFocus={() => setShowMachineDropdown(true)}
                onBlur={() =>
                  setTimeout(() => setShowMachineDropdown(false), 150)
                }
                autoComplete="off"
              />
              {showMachineDropdown && filteredMachines.length > 0 && (
                <ul className="absolute z-20 w-full max-h-48 overflow-y-auto bg-white border border-[#e9ecef] rounded-lg mt-1 shadow-lg">
                  {filteredMachines.map((m) => (
                    <li
                      key={m}
                      className={`px-4 py-2 cursor-pointer hover:bg-[#f6f9fc] ${
                        form.machineNumber === m
                          ? "bg-[#f6f9fc] text-[#344767]"
                          : "text-[#344767]"
                      }`}
                      onMouseDown={() => {
                        setForm((f) => ({ ...f, machineNumber: m }));
                        setMachineSearch("");
                        setShowMachineDropdown(false);
                      }}
                    >
                      {m}
                    </li>
                  ))}
                </ul>
              )}
              {form.machineNumber && (
                <div className="mt-1 text-xs text-[#5e72e4]">
                  Dipilih:{" "}
                  <span className="font-bold">{form.machineNumber}</span>
                </div>
              )}
            </div>
          </div>
          <br></br>
          {/* Section: Cek Compound */}
          <div className="mb-8 p-6 rounded-2xl border border-[#e9ecef] bg-white/90 shadow-lg">
            <h2 className="text-xl font-bold text-[#344767] mb-6">
              Cek Compound
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-[#344767] font-medium mb-2">
                  No Compound
                </label>
                <input
                  type="text"
                  name="compoundNo"
                  value={form.compoundNo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767]"
                />
              </div>
              <div>
                <label className="block text-[#344767] font-medium mb-2">
                  No Lot Compound
                </label>
                <input
                  type="text"
                  name="lotCompoundNo"
                  value={form.lotCompoundNo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767]"
                />
              </div>
              <div>
                <label className="block text-[#344767] font-medium mb-2">
                  Tgl Kadaluarsa
                </label>
                <input
                  type="date"
                  name="compoundExpiry"
                  value={form.compoundExpiry}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767]"
                />
              </div>
            </div>
          </div>

          {/* Section: Temperatur & Pressure */}
          <div className="mb-8 p-6 rounded-2xl border border-[#e9ecef] bg-white/90 shadow-lg">
            <h2 className="text-xl font-bold text-[#344767] mb-6">
              Temperatur & Pressure
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#344767] font-medium mb-2">
                  Setting Temperatur Atas
                </label>
                <input
                  type="text"
                  name="tempSettingTop"
                  value={form.tempSettingTop}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767]"
                />
              </div>
              <div>
                <label className="block text-[#344767] font-medium mb-2">
                  Setting Temperatur Bawah
                </label>
                <input
                  type="text"
                  name="tempSettingBottom"
                  value={form.tempSettingBottom}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767]"
                />
              </div>
              <div>
                <label className="block text-[#344767] font-medium mb-2">
                  Aktual Temperatur Lubang Sensor (Atas)
                </label>
                <input
                  type="text"
                  name="actualTempTop"
                  value={form.actualTempTop}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767]"
                />
              </div>
              <div>
                <label className="block text-[#344767] font-medium mb-2">
                  Aktual Temperatur Lubang Sensor (Bawah)
                </label>
                <input
                  type="text"
                  name="actualTempBottom"
                  value={form.actualTempBottom}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767]"
                />
              </div>
              <div>
                <label className="block text-[#344767] font-medium mb-2">
                  Temperature Cool Runner
                </label>
                <input
                  type="text"
                  name="tempCoolRunner"
                  value={form.tempCoolRunner}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767]"
                />
              </div>
              <div>
                <label className="block text-[#344767] font-medium mb-2">
                  Holding Pressure
                </label>
                <input
                  type="text"
                  name="holdingPressure"
                  value={form.holdingPressure}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767]"
                />
              </div>
            </div>
          </div>

          {/* Section: Hasil Produksi */}
          <div className="mb-8 p-6 rounded-2xl border border-[#e9ecef] bg-white/90 shadow-lg">
            <h2 className="text-xl font-bold text-[#344767] mb-6">
              Hasil Produksi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-[#344767] font-medium mb-2">
                  Cycle Produksi
                </label>
                <input
                  type="text"
                  name="productionCycle"
                  value={form.productionCycle}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767]"
                />
              </div>
              <div>
                <label className="block text-[#344767] font-medium mb-2">
                  Jumlah Produksi
                </label>
                <input
                  type="number"
                  name="productionQty"
                  value={form.productionQty}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767]"
                />
              </div>
              <div>
                <label className="block text-[#344767] font-medium mb-2">
                  Qty OK
                </label>
                <input
                  type="number"
                  name="qtyOk"
                  value={form.qtyOk}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767]"
                />
              </div>
              <div>
                <label className="block text-[#344767] font-medium mb-2">
                  Qty NG (otomatis)
                </label>
                <input
                  type="number"
                  name="qtyNg"
                  value={
                    form.productionQty && form.qtyOk
                      ? Number(form.productionQty) - Number(form.qtyOk)
                      : ""
                  }
                  readOnly
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767] opacity-70 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-[#344767] font-medium mb-2">
                  Jenis NG
                </label>
                <input
                  type="text"
                  name="ngType"
                  value={form.ngType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767]"
                />
              </div>
              <div>
                <label className="block text-[#344767] font-medium mb-2">
                  Kumulatif Belum Cleaning
                </label>
                <input
                  type="text"
                  name="cumulativeNotCleaned"
                  value={form.cumulativeNotCleaned}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767]"
                />
              </div>
            </div>
          </div>

          {/* Section: Press Type Toggle */}
          <div className="mb-8 p-6 rounded-2xl border border-[#e9ecef] bg-white/90 shadow-lg">
            <h2 className="text-xl font-bold text-[#344767] mb-6">
              Tipe Pengecekan Awal Produksi
            </h2>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setPressType("injection")}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                  pressType === "injection"
                    ? "bg-gradient-to-r from-[#5e72e4] to-[#825ee4] text-white shadow-lg"
                    : "bg-gray-200 text-[#344767] hover:bg-gray-300"
                }`}
              >
                Injection
              </button>
              <button
                type="button"
                onClick={() => setPressType("compression")}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                  pressType === "compression"
                    ? "bg-gradient-to-r from-[#5e72e4] to-[#825ee4] text-white shadow-lg"
                    : "bg-gray-200 text-[#344767] hover:bg-gray-300"
                }`}
              >
                Compression
              </button>
            </div>
          </div>

          {/* Section: Pengecekan Awal Produksi (Injection) */}
          {pressType === "injection" && (
          <div className="mb-8 p-6 rounded-2xl border border-[#e9ecef] bg-white/90 shadow-lg">
            <h2 className="text-xl font-bold text-[#344767] mb-6">
              Pengecekan Awal Produksi (Injection)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-[#344767] font-medium mb-2">
                  Cek Mold dan Jig
                </label>
                <input
                  type="text"
                  name="cekMoldJig"
                  value={form.cekMoldJig}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767]"
                />
              </div>
              <div>
                <label className="block text-[#344767] font-medium mb-2">
                  Pin
                </label>
                <input
                  type="text"
                  name="pin"
                  value={form.pin}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767]"
                />
              </div>
              <div>
                <label className="block text-[#344767] font-medium mb-2">
                  Lubang Pin
                </label>
                <input
                  type="text"
                  name="lubangPin"
                  value={form.lubangPin}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767]"
                />
              </div>
              <div>
                <label className="block text-[#344767] font-medium mb-2">
                  Core
                </label>
                <input
                  type="text"
                  name="core"
                  value={form.core}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767]"
                />
              </div>
              <div>
                <label className="block text-[#344767] font-medium mb-2">
                  Bearing
                </label>
                <input
                  type="text"
                  name="bearing"
                  value={form.bearing}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767]"
                />
              </div>
              <div>
                <label className="block text-[#344767] font-medium mb-2">
                  Cut Flow
                </label>
                <input
                  type="text"
                  name="cutFlow"
                  value={form.cutFlow}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767]"
                />
              </div>
              <div>
                <label className="block text-[#344767] font-medium mb-2">
                  Posisi Ejector
                </label>
                <input
                  type="text"
                  name="ejectorPosition"
                  value={form.ejectorPosition}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767]"
                />
              </div>
              <div>
                <label className="block text-[#344767] font-medium mb-2">
                  Release yang digunakan
                </label>
                <input
                  type="text"
                  name="releaseUsed"
                  value={form.releaseUsed}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767]"
                />
              </div>
              <div>
                <label className="block text-[#344767] font-medium mb-2">
                  Pengecekan ujung air gun, rubber cover & selongsong
                </label>
                <input
                  type="text"
                  name="airgunRubberTray"
                  value={form.airgunRubberTray}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767]"
                />
              </div>
              <div>
                <label className="block text-[#344767] font-medium mb-2">
                  Cek isapan vacum awal dan setelah stop produksi
                </label>
                <input
                  type="text"
                  name="vacumStartStop"
                  value={form.vacumStartStop}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767]"
                />
              </div>
              <div>
                <label className="block text-[#344767] font-medium mb-2">
                  Buang shot pertama awal/stop produksi
                </label>
                <input
                  type="text"
                  name="buangShotStartStop"
                  value={form.buangShotStartStop}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767]"
                />
              </div>
            </div>
          </div>
          )}

        {/* Section: Pengecekan Awal Produksi (Compression) */}
        {pressType === "compression" && (
          <div className="mb-8 p-6 rounded-2xl border border-[#e9ecef] bg-white/90 shadow-lg">
            <h2 className="text-xl font-bold text-[#344767] mb-6">
              Pengecekan Awal Produksi (Compression)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-[#344767] font-medium mb-2">
                Cek Mold dan Jig
              </label>
              <input
                type="text"
                name="cekMoldJigComp"
                value={form.cekMoldJigComp}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767]"
              />
            </div>
            <div>
              <label className="block text-[#344767] font-medium mb-2">
                Pin
              </label>
              <input
                type="text"
                name="pinComp"
                value={form.pinComp}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767]"
              />
            </div>
            <div>
              <label className="block text-[#344767] font-medium mb-2">
                Lubang Pin
              </label>
              <input
                type="text"
                name="lubangPinComp"
                value={form.lubangPinComp}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767]"
              />
            </div>
            <div>
              <label className="block text-[#344767] font-medium mb-2">
                Core
              </label>
              <input
                type="text"
                name="coreComp"
                value={form.coreComp}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767]"
              />
            </div>
            <div>
              <label className="block text-[#344767] font-medium mb-2">
                Bearing
              </label>
              <input
                type="text"
                name="bearingComp"
                value={form.bearingComp}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767]"
              />
            </div>
            <div>
              <label className="block text-[#344767] font-medium mb-2">
                Cut Flow
              </label>
              <input
                type="text"
                name="cutFlowComp"
                value={form.cutFlowComp}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767]"
              />
            </div>
            <div>
              <label className="block text-[#344767] font-medium mb-2">
                Posisi Ejector
              </label>
              <input
                type="text"
                name="ejectorPositionComp"
                value={form.ejectorPositionComp}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767]"
              />
            </div>
            <div>
              <label className="block text-[#344767] font-medium mb-2">
                Buang shot pertama awal/stop produksi
              </label>
              <input
                type="text"
                name="buangShotStartStopComp"
                value={form.buangShotStartStopComp}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767]"
              />
            </div>
            <div>
              <label className="block text-[#344767] font-medium mb-2">
                Release yang digunakan
              </label>
              <input
                type="text"
                name="releaseUsedComp"
                value={form.releaseUsedComp}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767]"
              />
            </div>
            <div>
              <label className="block text-[#344767] font-medium mb-2">
                Pengecekan ujung air gun, rubber cover, selongsong, dan nampan
              </label>
              <input
                type="text"
                name="airgunRubberTrayComp"
                value={form.airgunRubberTrayComp}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767]"
              />
            </div>
            <div>
              <label className="block text-[#344767] font-medium mb-2">
                Kondisi Alat Polka Yoke
              </label>
              <input
                type="text"
                name="polkaYokeCondition"
                value={form.polkaYokeCondition}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767]"
              />
            </div>
            <div>
              <label className="block text-[#344767] font-medium mb-2">
                Cek isapan vacum awal dan setelah stop produksi
              </label>
              <input
                type="text"
                name="vacumStartStopComp"
                value={form.vacumStartStopComp}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-white border border-[#e9ecef] text-[#344767]"
              />
            </div>
          </div>
        </div>
        )}

        <div className="pt-8 flex justify-end">
          <button
            type="submit"
            className="bg-gradient-to-r from-[#5e72e4] to-[#825ee4] hover:from-[#4e5ed3] hover:to-[#6a82fb] text-white font-bold py-2 px-8 rounded-xl shadow-lg transition-all duration-200"
          >
            Simpan Laporan
          </button>
        </div>
      </form>
    </div>
  );
}
