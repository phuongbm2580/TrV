import { Button, Result, Spin } from "antd";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { useVerifyEmailMutation } from "../../../common/hooks/useAuth";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const verifyMutation = useVerifyEmailMutation();

  useEffect(() => {
    if (token) {
      verifyMutation.mutate(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (!token) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-20">
        <Result
          status="warning"
          title="Thiếu mã xác thực"
          subTitle="Liên kết xác thực không hợp lệ hoặc đã bị thiếu token."
          extra={
            <Link to="/">
              <Button type="primary">Về trang chủ</Button>
            </Link>
          }
        />
      </section>
    );
  }

  if (verifyMutation.isPending || verifyMutation.isIdle) {
    return (
      <section className="grid min-h-[50vh] place-items-center px-4">
        <div className="text-center">
          <Spin size="large" />
          <p className="mt-4 text-[#9A9A9A]">Đang xác thực email...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-20">
      <Result
        status={verifyMutation.isSuccess ? "success" : "error"}
        title={verifyMutation.isSuccess ? "Xác thực email thành công" : "Xác thực email thất bại"}
        subTitle={
          verifyMutation.isSuccess
            ? "Tài khoản của bạn đã được kích hoạt. Bạn có thể đăng nhập và đặt vé."
            : "Liên kết xác thực có thể đã hết hạn hoặc không hợp lệ."
        }
        extra={
          <Link to="/">
            <Button type="primary">Về trang chủ</Button>
          </Link>
        }
      />
    </section>
  );
};

export default VerifyEmail;
