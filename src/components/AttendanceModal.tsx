type StaffType = {
  name: string;
  team: string;
}

type AttendanceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  staff?: StaffType
}

const AttendanceModal: React.FC<AttendanceModalProps> = () => {
  return (
    // Modal stuff here
    <></>
  )
}

export default AttendanceModal